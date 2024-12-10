package com.tronget;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JpaUtil {

    private static final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("persistenceUnit");

    public static EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    public static void close() {
        entityManagerFactory.close();
    }


}
