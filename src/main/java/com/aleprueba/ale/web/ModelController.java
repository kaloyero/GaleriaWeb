package com.aleprueba.ale.web;

import com.aleprueba.ale.Model;
import org.springframework.roo.addon.web.mvc.controller.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebScaffold(path = "models", formBackingObject = Model.class)
@RequestMapping("/models")
@Controller
public class ModelController {
}
