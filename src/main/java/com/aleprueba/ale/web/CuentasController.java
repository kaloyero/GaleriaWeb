package com.aleprueba.ale.web;

import com.mlopez.appname.entities.Cuentas;
import org.springframework.roo.addon.web.mvc.controller.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebScaffold(path = "cuentases", formBackingObject = Cuentas.class)
@RequestMapping("/cuentases")
@Controller
public class CuentasController {
}
