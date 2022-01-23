package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/unrolled/secure"
	"net/http"
)

func main() {
	router := gin.Default()

	router.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello",
		})
	})
	router.SetTrustedProxies([]string{"192.168.1.4"})
	router.GET("/client", func(c *gin.Context) {
		// If the client is 192.168.1.2, use the X-Forwarded-For
		// header to deduce the original client IP from the trust-
		// worthy parts of that header.
		// Otherwise, simply return the direct client IP
		fmt.Printf("ClientIP: %s\n", c.ClientIP())
		c.JSON(http.StatusOK, gin.H{"response": c.ClientIP()})
	})
	router.Use(LoadTls())
	//Enable port listening
	router.RunTLS(":10080", "server.pem", "server-key.pem")
}

func LoadTls() gin.HandlerFunc {
	return func(c *gin.Context) {
		middleware := secure.New(secure.Options{
			SSLRedirect: true,
			SSLHost:     "localhost:10080",
		})
		err := middleware.Process(c.Writer, c.Request)
		if err != nil {
			//If an error occurs, do not continue.
			fmt.Println(err)
			return
		}
		//Continue processing
		c.Next()
	}
}
