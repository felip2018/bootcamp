package com.bootcamp.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Utilities {
	
	public void uploadImage(byte[] bytes, String folder, String fileName) {
		
		try {	
			Path path = Paths.get(folder + fileName);
			Files.write(path, bytes);
		}catch(IOException ex) {
			ex.printStackTrace();
		}
	}
	
	public boolean contentTypeValidation(String contentType) {
		return contentType.equals("image/png") || contentType.equals("image/jpg") || contentType.equals("image/jpeg"); 
	}
	
	public String getExtension(String contentType) {
		String[] array = contentType.split("/");
		return array[1];
	}
}
