package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}
var clients []*websocket.Conn

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Upgrade upgrades the HTTP server connection to the WebSocket protocol.
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Print("upgrade failed: ", err)
			return
		}
		clients = append(clients, conn)
		defer conn.Close()

		// Continuosly read and write message
		for {
			mt, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("read failed:", err)
				break
			}
			input := string(message)
			message = []byte(input)

			// broadcasting message
			for _, client := range clients {
				err = client.WriteMessage(mt, message)
			}
		}
	})

	http.ListenAndServe(":8080", nil)
}
