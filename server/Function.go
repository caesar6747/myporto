package server

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"myporto/server/models"
	"net/http"
	"strings"

	"github.com/julienschmidt/httprouter"
)

type ServerInit interface {
	checkErr(err error)
}

func CheckErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func HandleOption(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	SetHeader(w)
	w.WriteHeader(http.StatusOK)
	respon := models.Respon{
		Code: 200,
	}
	encode := json.NewEncoder(w)
	err := encode.Encode(respon)
	CheckErr(err)
}

func SetHeader(w http.ResponseWriter) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "content-type")
	w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Add("Content-Type", "application/json")
}

// get all content_component data
func GetData(db *sql.DB) {
	rows, err := db.Query("SELECT id, content FROM content_component")
	CheckErr(err)

	for rows.Next() {
		data := models.ContentComponent{}
		err := rows.Scan(&data.Id, &data.Content)
		CheckErr(err)
	}
}

// get all content's content_component
func GetIndexContentComponent(db *sql.DB, id string, index string, data *string) {
	SQL := `SELECT id FROM content_component WHERE content_id = '` + id + `' AND "index" = ` + index + ``
	rows := db.QueryRow(SQL)
	rows.Scan(data)
}

// post 1 row to content_component
func PostData(db *sql.DB, data models.ContentComponent, ctx context.Context) error {
	array := []string{data.Id, data.Content, data.ContentId, data.Style, data.Index, data.Tag}
	value := `"` + strings.Join(array[:], `", "`) + `"`
	SQL := `INSERT INTO content_component (id, content, content_id, style, 'index', tag) VALUES (` + value + `)`
	_, err := db.ExecContext(ctx, SQL)
	CheckErr(err)
	return err
}

// update 1 row to content_component
func UpdateContentComponent(db *sql.DB, ctx context.Context, data models.ContentComponent) error {
	array := []string{" content='", data.Content, "', ", "tag=", data.Tag, ", ", "style='", data.Style, "'"}
	value := strings.Join(array[:], "")
	SQL := "UPDATE content_component SET " + value + " WHERE id = '" + data.Id + "'"
	_, err := db.ExecContext(ctx, SQL)
	CheckErr(err)
	return err
}

// delete excess rows in content_component
func DeleteSubContentRange(db *sql.DB, ctx context.Context, start string, contentid string) error {
	SQL := `DELETE FROM content_component WHERE content_id='` + contentid + `' AND "index" > ` + start
	_, err := db.ExecContext(ctx, SQL)
	CheckErr(err)

	return err
}
