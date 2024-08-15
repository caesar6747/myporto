package models

//table content_component
type ContentComponent struct {
	Id        string
	Index     string
	Content   string
	Tag       string
	ContentId string
	Style     string
}

//table content
type Content struct {
	Id          string
	Tittle      string
	PreviewImg  string
	PreviewDesc string
	CreatorId   string
	Posted      string
	Updated     string
	View        int
	Like        int
	ContentLink string
}
