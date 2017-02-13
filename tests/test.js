const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const assert = require('chai').assert
const path = require('path')
//pull menubar in
//const menuBarWindow = menubar.window

const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
const appPath = path.join(__dirname, '..', 'app', 'main.js')

global.before(function () {
    chai.should()
    chai.use(chaiAsPromised)
})

/* Research testing for menubar app - WIP */

describe('App starts with correct title, buttons', function () {
  let app

  before(function () {
    app = new Application({
      path: electronPath
    })
    return app.start()
  })

  after(function (done) {
    done()
    return app.stop()
  })


  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded().getWindowCount()
      .should.eventually.equal(1)
  })
})
