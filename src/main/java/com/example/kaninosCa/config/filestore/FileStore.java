package com.example.kaninosCa.config.filestore;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.example.kaninosCa.bucket.BucketName;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

@Service
public class FileStore {

    private final AmazonS3 s3;

    @Autowired
    public FileStore(AmazonS3 s3){
        this.s3 = s3;
    }

    public void save(String path, String fileName, Optional<Map<String,String>> optionalMetadata, InputStream inputStream){
        ObjectMetadata metadata = new ObjectMetadata();
        optionalMetadata.ifPresent(
                map->{
                    if (!map.isEmpty()){
                        map.forEach((key,value) -> metadata.addUserMetadata(key,value));
                    }
                }
        );
        try{
            s3.putObject(path,fileName, inputStream, metadata );
        } catch (AmazonServiceException e){
            throw new IllegalStateException("Failed to store file to s3", e);
        }
    }

    public byte[] download(String path, String key) {
        try{
            S3Object object = s3.getObject(path,key);
            S3ObjectInputStream inputStream = object.getObjectContent();
            return IOUtils.toByteArray(inputStream);
        }catch (AmazonServiceException | IOException e){
            throw new IllegalStateException("Failed to download file", e);
        }
    }

    public String getURL(String key)
    {
        try {
            return s3.generatePresignedUrl(BucketName.BUCKET_NAME.getBucketName(), key, new DateTime().plusMinutes(1).toDate()).toString();
        }
        catch (AmazonServiceException e){
            throw new IllegalStateException("Failed to download file", e);
        }
    }
}
