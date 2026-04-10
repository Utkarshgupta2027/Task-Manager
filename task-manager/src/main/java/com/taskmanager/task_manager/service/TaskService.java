package com.taskmanager.task_manager.service;



import com.taskmanager.task_manager.dto.TaskRequest;
import com.taskmanager.task_manager.model.Task;
import com.taskmanager.task_manager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle().trim());
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (request.getTitle() != null) {
            task.setTitle(request.getTitle().trim());
        }
        if (request.getCompleted() != null) {
            task.setCompleted(request.getCompleted());
        }
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}
