const mongoose = require('mongoose')

let StatSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  created_at: { type: Date, required: true },
  pageName: { type: String, required: true },
  eventType: { type: String, default: '' },
  userCity: { type: String, default: '' },
  userId: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  ip: { type: String, required: true }
})

StatSchema.statics.getStatByDate = async function(filter, per_page, page, cb) {
  try {
    let data = await this.model('stats').aggregate([
      { $match: filter },
      {
        $project: {
          date: { $substr: [{ $add: ['$created_at', 28800000 ] }, 0, 10] }, // 时区数据校准，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分组
          uid: 1 // 设置原有price字段可用，用于计算总价
        }
      },
      {
        $group: {
          _id: '$date', // 将_id设置为date数据
          pv: { $sum: 1 }, // 统计pv
          ids: { $addToSet: '$uid' },
        }
      },
      {
        $project: {
          date: '$_id',
          pv: 1,  // 保留pv数据
          uv: { $size: '$ids' },
        }
      },
      {
        $sort: { date: -1 } //根据日期排序
      },
      {
        $skip: (page - 1) * per_page
      },
      {
        $limit: per_page,
      }
    ])

    let count = await this.model('stats').aggregate([
      { $match: filter },
      {
        $project: {
          date: { $substr: [{ $add: ['$created_at', 28800000 ] }, 0, 10] }, // 时区数据校准，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分组
        }
      },
      {
        $group: {
          _id: '$date', // 将_id设置为date数据
        }
      },
      {
        $group: {
          _id: null,
          count: {$sum: 1}
        }
      },
    ])

    cb(data, count[0].count)
  } catch (err) {
    console.log('查询埋点数据失败', err)
    cb({})
  }
}

module.exports = StatSchema
