package com.healthchat.repository;

import com.healthchat.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findByUserIdOrderByUpdatedAtDesc(String userId);
    Optional<Chat> findByIdAndUserId(String id, String userId);
    void deleteByIdAndUserId(String id, String userId);
}
