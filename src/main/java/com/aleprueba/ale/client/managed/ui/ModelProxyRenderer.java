package com.aleprueba.ale.client.managed.ui;

import com.aleprueba.ale.client.managed.request.ModelProxy;
import com.google.gwt.requestfactory.ui.client.ProxyRenderer;

public class ModelProxyRenderer extends ProxyRenderer<ModelProxy> {

    private static com.aleprueba.ale.client.managed.ui.ModelProxyRenderer INSTANCE;

    protected ModelProxyRenderer() {
        super(new String[] { "message" });
    }

    public static com.aleprueba.ale.client.managed.ui.ModelProxyRenderer instance() {
        if (INSTANCE == null) {
            INSTANCE = new ModelProxyRenderer();
        }
        return INSTANCE;
    }

    public String render(ModelProxy object) {
        if (object == null) {
            return "";
        }
        return object.getMessage() + " (" + object.getId() + ")";
    }
}
