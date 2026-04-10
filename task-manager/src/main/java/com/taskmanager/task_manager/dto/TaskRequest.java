package com.taskmanager.task_manager.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TaskRequest {

    @NotBlank(message = "Title must not be blank")
    @Size(max = 255, message = "Title must be 255 characters or fewer")
    private String title;

    private Boolean completed;
}