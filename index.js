//Made by Thriam bakesvar B

const makeWASocket = require("@adiwajshing/baileys").default
const { MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./session.data.json')

async function thriam() {
  let session = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ['Thriam','Safari','1.0.0'],
  })
  session.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
    ) {
      thriam()
    }
    if (connection == "open") {
      const id = '919345588267@s.whatsapp.net'
      const sentMsg1  = await session.sendMessage(id, { text: '*Successfully connected to Thriam API*' })
      const sentMsg2  = await session.sendMessage(id, { text: 'Now you can use the session.data.json file that has been generated' })
    }
  })
  session.ev.on('creds.update', saveState)
  session.ev.on("messages.upsert", () => { })
}
(async function() {
    const response = await thriam();
    console.log(response);
})();
