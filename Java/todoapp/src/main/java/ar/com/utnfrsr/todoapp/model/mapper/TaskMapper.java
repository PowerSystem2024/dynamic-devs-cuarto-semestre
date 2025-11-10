package ar.com.utnfrsr.todoapp.model.mapper;

import ar.com.utnfrsr.todoapp.model.dto.TaskRequestDTO;
import ar.com.utnfrsr.todoapp.model.dto.TaskResponseDTO;
import ar.com.utnfrsr.todoapp.model.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public Task toEntity(TaskRequestDTO dto) {
        return Task.builder()
                .title(dto.title())
                .createdAt(dto.createdAt())
                .date(dto.date())
                .time(dto.time())
                .build();
    }

    public TaskResponseDTO toDTO(Task entity) {
        return new TaskResponseDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getDate(),
                entity.getTime(),
                entity.isFinished()
        );
    }
}
