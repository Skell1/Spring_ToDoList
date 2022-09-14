package main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import main.model.Task;

public class Storage {

    private volatile static int currentId = 1;
    private static final Map<Integer, Task> tasks = new HashMap<>();

    public static List<Task> getAllTasks() {
        ArrayList<Task> tasksList = new ArrayList<Task>(tasks.values());
        return tasksList;
    }

    public static int addTask(Task task) {
        int id = currentId++;
        task.setId(id);
        tasks.put(id, task);
        return id;
    }

    public static Task getTask(int taskId) {
        if (tasks.containsKey(taskId)) {
            return tasks.get(taskId);
        }
        return null;
    }
}