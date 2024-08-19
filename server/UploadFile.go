package server

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func UploadHandler(w http.ResponseWriter, r *http.Request) {
	// Pastikan method adalah POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse form dengan ukuran maksimal 10MB (disesuaikan sesuai kebutuhan)
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Ambil file dari form
	file, handler, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	file2, handler2, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()
	defer file2.Close()

	// Tentukan path untuk menyimpan file
	dst, err := os.Create(filepath.Join("./public", handler.Filename))
	if err != nil {
		http.Error(w, "Unable to create the file", http.StatusInternalServerError)
		return
	}
	dst2, err := os.Create(filepath.Join("./dist/client", handler2.Filename))
	if err != nil {
		http.Error(w, "Unable to create the file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()
	defer dst2.Close()

	// Salin file yang diupload ke file tujuan
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Unable to save the file", http.StatusInternalServerError)
		return
	}
	if _, err := io.Copy(dst2, file2); err != nil {
		http.Error(w, "Unable to save the file", http.StatusInternalServerError)
		return
	}

	// Berikan respon sukses
	fmt.Println(w, "File uploaded successfully: %s, %s", handler.Filename, handler2.Filename)
}
