#!/usr/bin/env node

const data_directory = "Project/data"
let command = '';
const fs = require('fs')
const { exec } = require('child_process');
const { parse } = require('path');
try {
  console.log("Running cleanup...");
  fs.readdir(data_directory, function (err, files) {
    //handling error
    if (err || files.length <= 0) {
      console.error(err)
      process.exit(1)
    }

    files.forEach(file => {
      if (file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2) == 'json') {
        // Load file, pretty the JSON, and write it back
        const json = fs.readFileSync(`${data_directory}/${file}`)
        const parsed = JSON.parse(json);
        // Keep scroll static, this changes every time you view a file
        // and will cause conflicts
        if (file == 'MapInfos.json') {
          parsed.forEach(obj => {
            if (obj && obj.scrollX) {
              obj.scrollX = 0
              obj.scrollY = 0
            }
          });
        }
        // Keep version static, this changes each time you save a file
        if (file == 'System.json') {
          parsed.versionId = "latest"
        }
        fs.writeFileSync(`${data_directory}/${file}`, JSON.stringify(parsed, null, 2))
        command += ` ${data_directory}/${file}`
      }

    })

    // Add the file back to the staging since it changed
    exec(`git add ${command} -f`, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
      process.exit(0)
    })

  });
} catch (err) {
  console.error(err)
  process.exit(1)
}