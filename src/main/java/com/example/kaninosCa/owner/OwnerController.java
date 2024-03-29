package com.example.kaninosCa.owner;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/owners")
@AllArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;

    @GetMapping
    public List<Owner> getAllOwners() {return ownerService.getAllOwners();}

//    @GetMapping
//    public List<Owner> getOwnersPagination() {return ownerService.getAllOwners();}

    @GetMapping(path="{id}")
    public Owner getOneOwner(@PathVariable("id") Long id){return ownerService.getOwnerById(id);}

    @GetMapping(path = "ownerView/{email}")
    public Owner getOwnerByEmail(@PathVariable("email") String email){
        return ownerService.getOwnerByEmail(email);
    }

    @GetMapping(path="/ownersDropdown")
    public List<Object> findOwnerIdAndName() {return ownerService.getAllOwnersIdAndName();}

    @PostMapping
    public void addOwner(@Valid @RequestBody Owner owner){
        ownerService.addOwner(owner);
    }

    @DeleteMapping(path="{id}")
    public void deleteOwner(
            @PathVariable("id") Long id){
        ownerService.deleteOwner(id);
    }




}
