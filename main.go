package main

import (
	"database/sql"
	"encoding/json"
	"myporto/server"
	"myporto/server/models"
	"net/http"

	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	router := httprouter.New()
	// Connect to database
	db, err := sql.Open("sqlite3", "./db.sqlite3")
	server.CheckErr(err)
	//GetData(db)

	router.OPTIONS("/api/deletesubcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)
		w.WriteHeader(http.StatusOK)
		respon := models.Respon{
			Code: 200,
		}
		encode := json.NewEncoder(w)
		err := encode.Encode(respon)
		server.CheckErr(err)
	})

	router.OPTIONS("/api/postcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)
		respon := models.Respon{
			Code: 200,
		}
		encode := json.NewEncoder(w)
		err := encode.Encode(respon)
		server.CheckErr(err)
	})

	router.OPTIONS("/api/updatecontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)
		respon := models.Respon{
			Code: 200,
		}
		encode := json.NewEncoder(w)
		err := encode.Encode(respon)
		server.CheckErr(err)
	})

	router.GET("/api/getcontent/:id/:i", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)
		var data string
		server.GetIndexContentComponent(db, params.ByName("id"), params.ByName("i"), &data)
		//fmt.Println(data)
		w.Write([]byte(data))
	})

	router.POST("/api/postcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)

		//start := time.Now()
		data := models.ContentComponent{
			Id:        uuid.New().String(),
			Index:     r.URL.Query().Get("i"),
			Content:   r.URL.Query().Get("content"),
			Tag:       r.URL.Query().Get("tag"),
			ContentId: r.URL.Query().Get("content_id"),
			Style:     r.URL.Query().Get("style"),
		}
		//end := time.Now()
		//elapse := end.Sub(start)
		//fmt.Println("param time execution : ", elapse)

		//start2 := time.Now()
		var p models.ContentComponentReq
		err := json.NewDecoder(r.Body).Decode(&p)
		//end2 := time.Now()
		//elapse2 := end2.Sub(start2)
		//fmt.Println("json time execution : ", elapse2)

		server.CheckErr(err)
		//fmt.Println(r.Body, p.content)

		posterr := server.PostData(db, data, r.Context())
		respon := models.Respon{
			Code: 200,
			Err:  posterr,
		}

		encode := json.NewEncoder(w)
		errr := encode.Encode(respon)
		server.CheckErr(errr)
	})

	router.PUT("/api/updatecontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)
		data := models.ContentComponent{
			Id:        r.URL.Query().Get("id"),
			Index:     r.URL.Query().Get("i"),
			Content:   r.URL.Query().Get("content"),
			Tag:       r.URL.Query().Get("tag"),
			ContentId: r.URL.Query().Get("content_id"),
			Style:     r.URL.Query().Get("style"),
		}
		err := server.UpdateContentComponent(db, r.Context(), data)
		respon := models.Respon{
			Code: 200,
			Err:  err,
		}

		encode := json.NewEncoder(w)
		errr := encode.Encode(respon)
		server.CheckErr(errr)
	})

	router.DELETE("/api/deletesubcontent", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		server.SetHeader(w)
		err := server.DeleteSubContentRange(db, r.Context(), r.URL.Query().Get("index"), r.URL.Query().Get("contentid"))

		respon := models.Respon{
			Code: 200,
			Err:  err,
		}

		encode := json.NewEncoder(w)
		errr := encode.Encode(respon)
		server.CheckErr(errr)
	})
	// defer close
	defer db.Close()

	server := http.Server{
		Handler: router,
		Addr:    ":3344",
	}

	server.ListenAndServe()
}
