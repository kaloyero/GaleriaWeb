package com.aleprueba.ale.client.managed.ui;

import com.aleprueba.ale.client.managed.request.ModelProxy;
import com.aleprueba.ale.client.managed.ui.ModelDetailsView.Binder;
import com.aleprueba.ale.client.scaffold.place.ProxyDetailsView;
import com.aleprueba.ale.client.scaffold.place.ProxyListView;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.SpanElement;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.HasClickHandlers;
import com.google.gwt.i18n.client.DateTimeFormat;
import com.google.gwt.i18n.client.NumberFormat;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.uibinder.client.UiHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.Widget;

public class ModelDetailsView extends ModelDetailsView_Roo_Gwt {

    private static final Binder BINDER = GWT.create(Binder.class);

    private static com.aleprueba.ale.client.managed.ui.ModelDetailsView instance;

    @UiField
    HasClickHandlers edit;

    @UiField
    HasClickHandlers delete;

    private Delegate delegate;

    public ModelDetailsView() {
        initWidget(BINDER.createAndBindUi(this));
    }

    public static com.aleprueba.ale.client.managed.ui.ModelDetailsView instance() {
        if (instance == null) {
            instance = new ModelDetailsView();
        }
        return instance;
    }

    public Widget asWidget() {
        return this;
    }

    public boolean confirm(String msg) {
        return Window.confirm(msg);
    }

    public ModelProxy getValue() {
        return proxy;
    }

    @UiHandler("delete")
    public void onDeleteClicked(ClickEvent e) {
        delegate.deleteClicked();
    }

    @UiHandler("edit")
    public void onEditClicked(ClickEvent e) {
        delegate.editClicked();
    }

    public void setDelegate(Delegate delegate) {
        this.delegate = delegate;
    }

    interface Binder extends UiBinder<HTMLPanel, ModelDetailsView> {
    }
}
