package ar.com.utnfrsr.todoapp.model.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

public record TaskRequestDTO(
        @NotNull String title,
        @NotNull LocalDateTime createdAt,
        @NotNull Date date,
        @NotNull LocalTime time
) {
}
