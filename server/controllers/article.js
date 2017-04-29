/**
 * Created by leekoho on 2017/4/25.
 */
import Article from '../models/article'

export async function getArticlesList(ctx) {
  // 'limit' field must be numeric.
  const page = parseInt(ctx.query.page) || 1
  const limit = parseInt(ctx.query.limit) || 1000
  const display = ctx.query.display
  let skip = limit * (page - 1)  // skip 查询数据跳过的数量
  let article = null, totalPage = null
  switch (display) {
    case 'true':
      article = await Article.find({display: true}).limit(limit).skip(skip).sort({updateTime: -1}).catch(err => {
          ctx.throw(500, 'Internal Server Error')
        })
      const articleCount = await Article.count({display: true}).catch(err => {
        ctx.throw(500, 'Internal Server Error')
      })
      totalPage = Math.ceil(articleCount / limit)
      break
    case 'false':
      article = await Article.find({display: false}).sort({updateTime: -1})
        .catch(err => {
          ctx.throw(500, 'Internal Server Error')
        })
      totalPage = 1
      break
    case 'all':
      article = await Article.find()
        .sort({updateTime: -1})
        .catch(err => {
          ctx.throw(500, 'Internal Server Error')
        })
      totalPage = 1
      break
  }
  ctx.body = {
    success: true,
    data: {
      article: article,
      totalPage: totalPage
    }
  }
}

export async function getArticle(ctx) {
  const id = ctx.params.id
  const article = await Article.findById(id).catch(err => {
    ctx.throw(404, '未找到该文章')
  })
  ctx.body = {
    success: true,
    data: article
  }
}

export async function createArticle(ctx) {
  const {markdown, display} = ctx.request.body
  const article = await Article.create({
    markdown,
    display
  }).catch(err => {
    ctx.throw(500, err)
  })
  ctx.body = {
    success: true,
    data: article
  }
}

export async function deleteArticle(ctx) {
  const id = ctx.params.id
  if (!id) {
    ctx.throw(500, 'id为空')
  }
  const article = await Article.remove({
    '_id': id
  }).catch(err => {
    console.log('删除失败')
    ctx.throw(500, err)
  })
  ctx.body = {
    success: true,
    msg: '删除成功'
  }
}

export async function updateArticle(ctx) {
  const id = ctx.params.id
  const {markdown, display, updateTime} = ctx.request.body
  if (!id) {
    ctx.throw(500, 'id为空')
  }
  let data = {}
  if (markdown) {
    data = {
      markdown: markdown,
      updateTime: updateTime
    }
  } else if (!markdown) {
    data = {
      display: display
    }
  }
  const article = await Article.update({_id: id}, data).catch(err => {
    console.log('更新失败')
    ctx.throw(500, err)
  })
  ctx.body = {
    success: true,
    msg: article
  }
}
