//Made by Thriam bakesvar B

const makeWASocket = require("@adiwajshing/baileys").default
const qrcode = require("qrcode-terminal")
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./session.data.json')

function thriam() {
  let session = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ['Thriam','Safari','1.0.0'],
  })
  session.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      await delay(1000 * 10)
      process.exit(0)
    }
    if (
      connection === "close" &&
      lastDisconnect &&
	@@ -25,8 +22,16 @@ function thriam() {
    ) {
      thriam()
    }
  })
  session.ev.on('creds.update', saveState)
  session.ev.on("messages.upsert", () => { })
}
thriam()
