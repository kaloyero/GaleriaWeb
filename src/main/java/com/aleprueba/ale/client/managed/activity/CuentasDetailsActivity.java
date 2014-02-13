package com.aleprueba.ale.client.managed.activity;

import com.aleprueba.ale.client.managed.request.ApplicationRequestFactory;
import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.aleprueba.ale.client.scaffold.activity.IsScaffoldMobileActivity;
import com.aleprueba.ale.client.scaffold.place.ProxyDetailsView;
import com.aleprueba.ale.client.scaffold.place.ProxyListPlace;
import com.aleprueba.ale.client.scaffold.place.ProxyPlace;
import com.aleprueba.ale.client.scaffold.place.ProxyPlace.Operation;
import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.requestfactory.shared.EntityProxy;
import com.google.gwt.requestfactory.shared.EntityProxyId;
import com.google.gwt.requestfactory.shared.Receiver;
import com.google.gwt.requestfactory.shared.Request;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import java.util.Set;

public class CuentasDetailsActivity extends CuentasDetailsActivity_Roo_Gwt {

    private final PlaceController placeController;

    private final ProxyDetailsView<CuentasProxy> view;

    private AcceptsOneWidget display;

    public CuentasDetailsActivity(EntityProxyId<com.aleprueba.ale.client.managed.request.CuentasProxy> proxyId, ApplicationRequestFactory requests, PlaceController placeController, ProxyDetailsView<com.aleprueba.ale.client.managed.request.CuentasProxy> view) {
        this.placeController = placeController;
        this.proxyId = proxyId;
        this.requests = requests;
        view.setDelegate(this);
        this.view = view;
    }

    public void deleteClicked() {
        if (!view.confirm("Really delete this entry? You cannot undo this change.")) {
            return;
        }
        requests.cuentasRequest().remove().using(view.getValue()).fire(new Receiver<Void>() {

            public void onSuccess(Void ignore) {
                if (display == null) {
                    return;
                }
                placeController.goTo(getBackButtonPlace());
            }
        });
    }

    public void editClicked() {
        placeController.goTo(getEditButtonPlace());
    }

    public Place getBackButtonPlace() {
        return new ProxyListPlace(CuentasProxy.class);
    }

    public String getBackButtonText() {
        return "Back";
    }

    public Place getEditButtonPlace() {
        return new ProxyPlace(view.getValue().stableId(), Operation.EDIT);
    }

    public String getTitleText() {
        return "View Cuentas";
    }

    public boolean hasEditButton() {
        return true;
    }

    public void onCancel() {
        onStop();
    }

    public void onStop() {
        display = null;
    }

    public void start(AcceptsOneWidget displayIn, EventBus eventBus) {
        this.display = displayIn;
        Receiver<EntityProxy> callback = new Receiver<EntityProxy>() {

            public void onSuccess(EntityProxy proxy) {
                if (proxy == null) {
                    placeController.goTo(getBackButtonPlace());
                    return;
                }
                if (display == null) {
                    return;
                }
                view.setValue((CuentasProxy) proxy);
                display.setWidget(view);
            }
        };
        find(callback);
    }
}
