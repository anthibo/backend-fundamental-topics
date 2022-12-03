package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"time"
)

const (
	HOST = "localhost"
	PORT = "9001"
	TYPE = "tcp"
)

func handleIncomingRequest(conn net.Conn) {
	// store incoming data
	for {
		buffer := make([]byte, 1024)
		_, err := conn.Read(buffer)

		if err != nil {
			log.Fatal(err)
		}
		// respond
		time := time.Now().Format("Monday, 02-Jan-06 15:04:05 MST")
		msg := string(buffer)

		fmt.Printf("msg: %s | %s\n", msg, time)
		conn.Write([]byte("Hi back!"))
	}

}

func main() {
	listen, err := net.Listen(TYPE, HOST+":"+PORT)
	fmt.Printf("connection established on %s \n", HOST+":"+PORT)
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	defer listen.Close()
	for {
		conn, err := listen.Accept()
		if err != nil {
			log.Fatal(err)
			conn.Close()
		} // handle incoming connections
		go handleIncomingRequest(conn)

	}
}
