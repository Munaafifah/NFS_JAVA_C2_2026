package com.example.assetTracker.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.assetTracker.model.Asset;

public interface AssetRepository extends MongoRepository<Asset, String> {
    // Custom query methods can be defined here if needed

}