// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.

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

public abstract class CuentasEditActivityWrapper_Roo_Gwt implements Activity, IsScaffoldMobileActivity {

    protected Activity wrapped;

    protected View<?> view;

    protected ApplicationRequestFactory requests;

    @Override
    public void start(AcceptsOneWidget display, EventBus eventBus) {
        wrapped.start(display, eventBus);
    }

    public interface View_Roo_Gwt<V extends com.aleprueba.ale.client.scaffold.place.ProxyEditView<com.aleprueba.ale.client.managed.request.CuentasProxy, V>> extends ProxyEditView<CuentasProxy, V> {
    }
}