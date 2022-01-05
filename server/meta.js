const metaData = {
  ko: {
    title: 'VIRNECT Login center',
    description:
      '증강현실 기술기업 버넥트는 고객의 요구에 맞는 최고의 솔루션을 제공합니다. 산업에 특화된 AR 솔루션으로 공정 오류 감소, 생산 시간 단축 등 산업 효율성 향상을 지원합니다.',
    og: {
      title: 'VIRNECT Login center',
      description:
        '증강현실 기술기업 버넥트는 고객의 요구에 맞는 최고의 솔루션을 제공합니다. 산업에 특화된 AR 솔루션으로 공정 오류 감소, 생산 시간 단축 등 산업 효율성 향상을 지원합니다.',
      site_name: 'VIRNECT',
      type: 'website',
    },
  },
  en: {
    title: 'VIRNECT Login center',
    description: 'Post COVID-19,	Solve industrial problems remotely',
    og: {
      title: 'VIRNECT Login center',
      description: 'Post COVID-19,	Solve industrial problems remotely',
      site_name: 'VIRNECT Login center',
      type: 'website',
    },
  },
}
const metaHTML = lang => {
  const htmlText = `<html lang="${lang}">
    <head>
      <title>${metaData[lang].title}</title>
      <meta name="description" content="${metaData[lang].description}">
      <meta name="title" content="${metaData[lang].title}">
      <meta property="og:title" content="${metaData[lang].og.title}">
      <meta property="og:description" content="${metaData[lang].og.description}">
      <meta property="og:site_name" content="${metaData[lang].og.site_name}">
      <meta property="og:type" content="${metaData[lang].og.type}">
    </head>
  </html>`
  return htmlText
}
const metaRegex =
  /charset=|name=(.*?)(description|viewport|title)|http-equiv=(.*?)X-UA-Compatible|property=(.*?)(og:title|og:description|og:image|og:site_name|og:url|og:type)/gi
const linkRegex = /rel=(.*?)icon/gi
const metaHEAD = (html, lang) => {
  const head = html.match(/<head>(.*?)<\/head>/gs)[0]
  let append = ''
  const metas = head.match(/<meta .*?>/gs)
  if (metas) {
    metas.forEach(meta => {
      if (!new RegExp(metaRegex).test(meta)) {
        append += meta
      }
    })
  }
  const links = head.match(/<link .*?>/gs)
  if (links) {
    links.forEach(link => {
      if (!new RegExp(linkRegex).test(link)) {
        append += link
      }
    })
  }
  const scripts = head.match(/<script (.*?)<\/script>/gs)
  if (scripts) {
    scripts.forEach(script => {
      append += script
    })
  }
  const htmlReset = html.replace(
    /<head>.*?<\/head>/gs,
    `<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <meta http-equiv="X-UA-Compatible" content="IE=Edge, Chrome=1">
      <meta name="format-detection" content="telephone=no,email=no">
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <title>${metaData[lang].title}</title>
      <meta name="title" content="${metaData[lang].title}">
      <meta name="description" content="${metaData[lang].description}">
      <meta property="og:title" content="${metaData[lang].og.title}">
      <meta property="og:description" content="${metaData[lang].og.description}">
      <meta property="og:image" href="/og_img.png">
      <meta property="og:site_name" content="${metaData[lang].og.site_name}">
      <meta property="og:type" content="${metaData[lang].og.type}">
      <link rel="shortcut icon" href="/favicon.ico">
      ${append}
    </head>`,
  )
  const htmlText = htmlReset.replace(
    /<html lang.*?>/gs,
    `<html lang="${lang}">`,
  )
  return htmlText
}
module.exports = { metaHTML, metaHEAD }
