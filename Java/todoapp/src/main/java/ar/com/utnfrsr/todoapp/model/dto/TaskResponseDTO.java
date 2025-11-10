package ar.com.utnfrsr.todoapp.model.dto;

import java.time.LocalTime;
import java.util.Date;

public record TaskResponseDTO (
        Long id,
        String title,
        Date date,
        LocalTime time,
        boolean finished
) {
}
