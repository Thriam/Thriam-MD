//Made by Thriam bakesvar B

const makeWASocket = require("@adiwajshing/baileys").default
const qrcode = require("qrcode-terminal")
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./session.data.json')

async function thriam() {
  let session = makeWASocket({
    auth: state,
    printQRInTerminal: true,
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
    else if (connection == "open"){
            await delay(1000 * 10)
            process.exit(0)
        }
  })
  session.ev.on('creds.update', saveState)
  session.ev.on('messages.upsert', () => {})
}
(async function() {
    const response = await thriam();
    console.log(response);
})();
