// Deletes old Parcel-generated hashed files from the repo root before each build
const fs = require('fs')

fs.readdirSync('.')
  .filter(f => /\.[a-f0-9]{8,}\.(js|css)(\.map)?$/.test(f))
  .forEach(f => {
    fs.unlinkSync(f)
    console.log('cleaned:', f)
  })
