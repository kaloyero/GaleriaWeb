// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.aleprueba.ale;

import com.aleprueba.ale.Model;
import java.lang.Integer;
import java.lang.Long;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PersistenceContext;
import javax.persistence.Version;
import org.springframework.transaction.annotation.Transactional;

privileged aspect Model_Roo_Entity {
    
    declare @type: Model: @Entity;
    
    @PersistenceContext
    transient EntityManager Model.entityManager;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long Model.id;
    
    @Version
    @Column(name = "version")
    private Integer Model.version;
    
    public Long Model.getId() {
        return this.id;
    }
    
    public void Model.setId(Long id) {
        this.id = id;
    }
    
    public Integer Model.getVersion() {
        return this.version;
    }
    
    public void Model.setVersion(Integer version) {
        this.version = version;
    }
    
    @Transactional
    public void Model.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void Model.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            Model attached = Model.findModel(this.id);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void Model.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void Model.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public Model Model.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Model merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
    public static final EntityManager Model.entityManager() {
        EntityManager em = new Model().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long Model.countModels() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Model o", Long.class).getSingleResult();
    }
    
    public static List<Model> Model.findAllModels() {
        return entityManager().createQuery("SELECT o FROM Model o", Model.class).getResultList();
    }
    
    public static Model Model.findModel(Long id) {
        if (id == null) return null;
        return entityManager().find(Model.class, id);
    }
    
    public static List<Model> Model.findModelEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Model o", Model.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
}
