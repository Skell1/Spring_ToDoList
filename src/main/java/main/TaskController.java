package main;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import main.model.Task;
import main.model.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {

    private final TaskRepository taskRepository;

    // Рекомендуемый вариант внедрения зависимости:
    // внедрение зависимости в класс через конструктор
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks/")
    public List<Task> list() {
        Iterable<Task> taskIterable = taskRepository.findAll();

        List<Task> tasks = new ArrayList<>();
        for (Task task : taskIterable) {
            tasks.add(task);
        }
        return tasks;
    }

    @PostMapping("/tasks/")
    public int add(Task task) {
        Task newTask = taskRepository.save(task);
        return newTask.getId();
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        Optional<Task> optionalTask = taskRepository.findById(id);

        if (!optionalTask.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return new ResponseEntity<>(optionalTask.get(), HttpStatus.OK);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<?> deleteID(@PathVariable int id) {
        Optional<Task> optionalTask = taskRepository.findById(id);

        if (!optionalTask.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        taskRepository.deleteById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<?> PutID(Task task) {
        Optional<Task> optionalTask = taskRepository.findById(task.getId());
        taskRepository.save(task);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/tasks/")
    public ResponseEntity<?> deleteID() {
        taskRepository.deleteAll();
        return null;
    }
}