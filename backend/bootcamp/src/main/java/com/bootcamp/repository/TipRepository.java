package com.bootcamp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.entity.Tip;

public interface TipRepository extends JpaRepository<Tip, Long> {

}
