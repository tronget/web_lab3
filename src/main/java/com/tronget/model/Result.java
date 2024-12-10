package com.tronget.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
public class Result {

    @NonNull
    @OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    @JoinColumn(name = "dot_id", nullable = false, unique = true)
    private Dot dot;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private boolean isHit;
}
