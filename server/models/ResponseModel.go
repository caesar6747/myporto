package models

type ContentComponentReq struct {
	Id         string
	Index      string
	Content    string
	Tag        string
	Content_id string
	Style      string
}

type Respon struct {
	Code int
	Err  error
}

type ResponData struct {
	Code int
	Data any
}
