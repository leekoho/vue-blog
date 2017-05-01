import About from '../models/about'
import moment from 'moment'

export async function getAbout(ctx) {
  const about = await About.findOne().catch(err => {
    ctx.throw(404, err)
  })
  ctx.body = {
    success: true,
    data: about
  }
}

export async function updateAbout(ctx) {
  const markdown = ctx.request.body.markdown
  console.log(markdown)
  const about = await About.findOneAndUpdate({}, {
    markdown: markdown,
    updateTime: Date.now()
  }).catch(err => {
    ctx.throw(500, err)
  })
  ctx.body = {
    success: true,
    data: about
  }
}
