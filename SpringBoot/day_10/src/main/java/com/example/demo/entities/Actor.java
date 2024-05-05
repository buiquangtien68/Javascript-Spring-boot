package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "actors")
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(nullable = false)
    String name;
    String avatar;
    String description;
}
