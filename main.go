package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
	_ "github.com/mattn/go-sqlite3"
)

type ContentComponent struct {
	id        string
	index     string
	content   string
	tag       string
	contentId string
	style     string
}

type ContentComponentReq struct {
	id         string
	i          string
	content    string
	tag        string
	content_id string
	style      string
}

type Content struct {
	id          string
	tittle      string
	previewImg  string
	previewDesc string
	creatorId   string
	posted      string
	updated     string
	view        int
	like        int
	contentLink string
}

type Respon struct {
	Code int
	err  error
}

func checkErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func GetData(db *sql.DB) {
	rows, err := db.Query("SELECT id, content FROM content_component")
	checkErr(err)

	for rows.Next() {
		data := ContentComponent{}
		err := rows.Scan(&data.id, &data.content)
		checkErr(err)
		//fmt.Println(data)
	}
}

func SetHeader(w http.ResponseWriter) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "content-type")
	w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Add("Content-Type", "application/json")
}

func PostData(db *sql.DB, data ContentComponent, ctx context.Context) error {
	array := []string{data.id, data.content, data.contentId, data.style, data.index, data.tag}
	value := "'" + strings.Join(array[:], "', '") + "'"
	SQL := "INSERT INTO content_component (id, content, content_id, style, 'index', tag) VALUES (" + value + ")"
	fmt.Println(SQL)
	_, err := db.ExecContext(ctx, SQL)
	checkErr(err)
	fmt.Println("point debug")
	return err
}

func SimplePost(db *sql.DB, ctx context.Context) {
	SQL := "INSERT INTO content_component (id, index) VALUES ('sfguasdyfweh', 1)"
	_, err := db.ExecContext(ctx, SQL)
	checkErr(err)
}

func main() {
	router := httprouter.New()
	// Connect to database
	db, err := sql.Open("sqlite3", "./db.sqlite3")
	checkErr(err)
	//GetData(db)

	router.OPTIONS("/api/postcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		SetHeader(w)
		respon := Respon{
			Code: 200,
		}
		encode := json.NewEncoder(w)
		err := encode.Encode(respon)
		checkErr(err)
	})
	router.POST("/api/postcontent", func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		SetHeader(w)

		start := time.Now()
		data := ContentComponent{
			id:        uuid.New().String(),
			index:     r.URL.Query().Get("i"),
			content:   r.URL.Query().Get("content"),
			tag:       r.URL.Query().Get("tag"),
			contentId: r.URL.Query().Get("content_id"),
			style:     r.URL.Query().Get("style"),
		}
		end := time.Now()
		elapse := end.Sub(start)
		fmt.Println("param time execution : ", elapse)

		start2 := time.Now()
		var p ContentComponentReq
		err := json.NewDecoder(r.Body).Decode(&p)
		end2 := time.Now()
		elapse2 := end2.Sub(start2)
		fmt.Println("json time execution : ", elapse2)

		checkErr(err)
		fmt.Println(r.Body, p.content)

		posterr := PostData(db, data, r.Context())
		respon := Respon{
			Code: 200,
			err:  posterr,
		}

		encode := json.NewEncoder(w)
		errr := encode.Encode(respon)
		checkErr(errr)
	})
	// defer close
	defer db.Close()

	server := http.Server{
		Handler: router,
		Addr:    "localhost:3344",
	}

	server.ListenAndServe()
}
