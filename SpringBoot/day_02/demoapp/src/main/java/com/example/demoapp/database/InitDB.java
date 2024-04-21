package com.example.demoapp;

import com.example.demoapp.database.BookDB;
import com.example.demoapp.model.Book;
import com.example.demoapp.utils.IFileReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;

@Configurable
public class InitDB  implements CommandLineRunner {
   //Thường setup ban đầu, vừa vào sẽ dùng CommandLineRunner
    @Qualifier("jsonFileReader") // dùng Qualifier hoặc Primary
    @Autowired
    private IFileReader fileReader;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Khởi tạo dữ liệu");
        BookDB.books=fileReader.readFile("BookData.json");
        // In ra danh sách
        for (Book book : BookDB.books) {
            System.out.println(book);
        }
        System.out.println("Số lượng sách: " + BookDB.books.size());
    }
}
