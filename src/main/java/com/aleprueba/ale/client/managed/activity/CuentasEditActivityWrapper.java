package com.aleprueba.ale.client.managed.activity;

import com.aleprueba.ale.client.managed.activity.CuentasEditActivityWrapper.View;
import com.aleprueba.ale.client.managed.request.ApplicationRequestFactory;
import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.aleprueba.ale.client.scaffold.activity.IsScaffoldMobileActivity;
import com.aleprueba.ale.client.scaffold.place.ProxyEditView;
import com.aleprueba.ale.client.scaffold.place.ProxyListPlace;
import com.aleprueba.ale.client.scaffold.place.ProxyPlace;
import com.google.gwt.activity.shared.Activity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.requestfactory.shared.EntityProxyId;
import com.google.gwt.requestfactory.shared.Receiver;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class CuentasEditActivityWrapper extends CuentasEditActivityWrapper_Roo_Gwt {

    private final EntityProxyId<CuentasProxy> proxyId;

    public CuentasEditActivityWrapper(ApplicationRequestFactory requests, View<?> view, Activity activity, EntityProxyId<com.aleprueba.ale.client.managed.request.CuentasProxy> proxyId) {
        this.requests = requests;
        this.view = view;
        this.wrapped = activity;
        this.proxyId = proxyId;
    }

    public Place getBackButtonPlace() {
        return (proxyId == null) ? new ProxyListPlace(CuentasProxy.class) : new ProxyPlace(proxyId, ProxyPlace.Operation.DETAILS);
    }

    public String getBackButtonText() {
        return "Cancel";
    }

    public Place getEditButtonPlace() {
        return null;
    }

    public String getTitleText() {
        return (proxyId == null) ? "New Cuentas" : "Edit Cuentas";
    }

    public boolean hasEditButton() {
        return false;
    }

    @Override
    public String mayStop() {
        return wrapped.mayStop();
    }

    @Override
    public void onCancel() {
        wrapped.onCancel();
    }

    @Override
    public void onStop() {
        wrapped.onStop();
    }

    public interface View<V extends com.aleprueba.ale.client.scaffold.place.ProxyEditView<com.aleprueba.ale.client.managed.request.CuentasProxy, V>> extends View_Roo_Gwt<V> {
    }
}
