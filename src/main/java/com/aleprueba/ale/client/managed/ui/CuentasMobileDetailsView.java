package com.aleprueba.ale.client.managed.ui;

import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.aleprueba.ale.client.managed.ui.CuentasMobileDetailsView.Binder;
import com.aleprueba.ale.client.scaffold.place.ProxyDetailsView;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Element;
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

public class CuentasMobileDetailsView extends CuentasMobileDetailsView_Roo_Gwt {

    private static final Binder BINDER = GWT.create(Binder.class);

    private static com.aleprueba.ale.client.managed.ui.CuentasMobileDetailsView instance;

    @UiField
    HasClickHandlers delete;

    private Delegate delegate;

    public CuentasMobileDetailsView() {
        initWidget(BINDER.createAndBindUi(this));
    }

    public static com.aleprueba.ale.client.managed.ui.CuentasMobileDetailsView instance() {
        if (instance == null) {
            instance = new CuentasMobileDetailsView();
        }
        return instance;
    }

    public Widget asWidget() {
        return this;
    }

    public boolean confirm(String msg) {
        return Window.confirm(msg);
    }

    public CuentasProxy getValue() {
        return proxy;
    }

    @UiHandler("delete")
    public void onDeleteClicked(ClickEvent e) {
        delegate.deleteClicked();
    }

    public void setDelegate(Delegate delegate) {
        this.delegate = delegate;
    }

    interface Binder extends UiBinder<HTMLPanel, CuentasMobileDetailsView> {
    }
}
