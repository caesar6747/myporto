package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"myporto/server"
	"myporto/server/models"
	"net/http"
	"time"

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

	router.OPTIONS("/api/upload-image", server.HandleOption)

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

	router.OPTIONS("/api/addnewcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.HandleOption(w, r, params)
	})

	router.OPTIONS("/api/updatecontenttittle", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.HandleOption(w, r, params)
	})

	router.OPTIONS("/api/deletecontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.HandleOption(w, r, params)
	})

	router.GET("/api/getcontent/:id/:i", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)
		var data string
		server.GetIndexContentComponent(db, params.ByName("id"), params.ByName("i"), &data)
		w.Write([]byte(data))
	})

	router.POST("/api/postcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		server.SetHeader(w)

		data := models.ContentComponent{
			Id:        uuid.New().String(),
			Index:     r.URL.Query().Get("i"),
			Content:   r.URL.Query().Get("content"),
			Tag:       r.URL.Query().Get("tag"),
			ContentId: r.URL.Query().Get("content_id"),
			Style:     r.URL.Query().Get("style"),
		}
		var p models.ContentComponentReq
		err := json.NewDecoder(r.Body).Decode(&p)

		server.CheckErr(err)

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

	router.POST("/api/upload-image", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		server.SetHeader(w)
		server.UploadHandler(w, r)
		w.Write([]byte{http.StatusOK})
	})

	router.POST("/api/addnewcontent", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		server.SetHeader(w)
		date := time.Now()
		contentid := uuid.New().String()

		newContent := models.Content{
			Id:          contentid,
			Tittle:      "No Title",
			CreatorId:   r.URL.Query().Get("creatorid"),
			PreviewImg:  "none",
			PreviewDesc: "this content no peview description yet",
			Posted:      date.Format("02 Jan 2006"),
			Updated:     "none",
			ContentLink: "bla-bla-bla",
		}

		err := server.PostNewContent(db, r.Context(), newContent)
		server.CheckErr(err)

		res := models.ResponData{
			Code: 200,
			Data: contentid,
		}
		encode := json.NewEncoder(w)
		errr := encode.Encode(res)
		server.CheckErr(errr)
	})

	router.POST("/api/updatecontenttittle", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		//fmt.Println(r.URL.Query().Get("tittle"), r.URL.Query().Get("contentid"))
		server.SetHeader(w)
		server.UpdateContentTittle(db, r.Context(), r.URL.Query().Get("tittle"), r.URL.Query().Get("contentid"))
	})

	router.DELETE("/api/deletecontent", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		server.SetHeader(w)
		fmt.Println(r.URL.Query().Get("contentid"), " requested...")
		server.DeleteContent(db, r.Context(), r.URL.Query().Get("contentid"))
		server.DeleteSubContentRange(db, r.Context(), "-1", r.URL.Query().Get("contentid"))
	})

	// defer close
	defer db.Close()

	server := http.Server{
		Handler: router,
		Addr:    ":3344",
	}

	server.ListenAndServe()
}
