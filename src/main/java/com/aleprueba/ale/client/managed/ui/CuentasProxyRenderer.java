package com.aleprueba.ale.client.managed.ui;

import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.google.gwt.requestfactory.ui.client.ProxyRenderer;

public class CuentasProxyRenderer extends ProxyRenderer<CuentasProxy> {

    private static com.aleprueba.ale.client.managed.ui.CuentasProxyRenderer INSTANCE;

    protected CuentasProxyRenderer() {
        super(new String[] { "id" });
    }

    public static com.aleprueba.ale.client.managed.ui.CuentasProxyRenderer instance() {
        if (INSTANCE == null) {
            INSTANCE = new CuentasProxyRenderer();
        }
        return INSTANCE;
    }

    public String render(CuentasProxy object) {
        if (object == null) {
            return "";
        }
        return object.getId() + " (" + object.getId() + ")";
    }
}
