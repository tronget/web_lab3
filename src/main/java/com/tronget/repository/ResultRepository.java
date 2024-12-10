package com.tronget.repository;

import com.tronget.model.Result;
import com.tronget.JpaUtil;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.io.Serializable;
import java.util.List;

@Named
@SessionScoped
public class ResultRepository implements Serializable, Repository<Result> {

    @Override
    public List<Result> findAll() {
        EntityManager em = JpaUtil.getEntityManager();
        em.getTransaction().begin();
        TypedQuery<Result> query = em.createQuery("SELECT e FROM Result e", Result.class);
        List<Result> results = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return results;
    }

    @Override
    public Result save(Result entity) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(entity);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
            return null;
        } finally {
            em.close();
        }
        return entity;
//        Session session = HibernateUtil.openSession();
//        Transaction transaction = null;
//        try {
//            transaction = session.beginTransaction();
//            session.persist(entity);
//            transaction.commit();
//        } catch (Exception e) {
//            if (transaction != null) {
//                transaction.rollback();
//            }
//            e.printStackTrace();
//            return null;
//        } finally {
//            session.close();
//        }
//        return entity;
    }
}
