package com.tronget.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Dot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dot_id")
    private Long id;

    @NonNull
    private Double x;

    @NonNull
    private Double y;

    @NonNull
    private Double r;

    @OneToOne(mappedBy = "dot", orphanRemoval = true, cascade = CascadeType.ALL)
    private Result result;
}
