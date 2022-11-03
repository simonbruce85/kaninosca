package com.example.kaninosCa.owner;

import com.example.kaninosCa.exception.BadRequestException;
import com.example.kaninosCa.exception.NotFoundException;
import com.example.kaninosCa.pet.Pet;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@AllArgsConstructor
@Service
public class OwnerService {

    private final OwnerRepository ownerRepository;

    public List<Owner> getAllOwners(){return ownerRepository.findAll();}

    public List<Object> getAllOwnersIdAndName(){return ownerRepository.getAllIdsAndNames();}

    @PostMapping
    public void addOwner(Owner owner) {
        Boolean existsPhone = ownerRepository.selectExistsPhone(owner.getPhone());
        if (existsPhone){
            throw new BadRequestException(
                    "Phone " + owner.getPhone() + " is taken"
            );
        }
        ownerRepository.save(owner);
    }

    public long countOwner(){
        return ownerRepository.count();
    }

    public  void deleteOwner(Long ownerId){

        if (!ownerRepository.existsById(ownerId)) {
            throw new NotFoundException(
                    "Owner " + getOwnerById(ownerId).getName() + " does not exists"
            );
        }

        ownerRepository.deleteById(ownerId);
    }

    public Owner getOwnerById(Long ownerId){
       return ownerRepository.findById(ownerId).get();
    }

}
