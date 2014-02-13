package com.aleprueba.ale.client.managed.activity;

import com.aleprueba.ale.client.managed.request.ApplicationRequestFactory;
import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.aleprueba.ale.client.scaffold.ScaffoldMobileApp;
import com.aleprueba.ale.client.scaffold.activity.IsScaffoldMobileActivity;
import com.aleprueba.ale.client.scaffold.place.AbstractProxyListActivity;
import com.aleprueba.ale.client.scaffold.place.ProxyListView;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.requestfactory.shared.Receiver;
import com.google.gwt.requestfactory.shared.Request;
import com.google.gwt.view.client.Range;
import java.util.List;

public class CuentasListActivity extends AbstractProxyListActivity<CuentasProxy> implements IsScaffoldMobileActivity {

    private final ApplicationRequestFactory requests;

    public CuentasListActivity(ApplicationRequestFactory requests, ProxyListView<com.aleprueba.ale.client.managed.request.CuentasProxy> view, PlaceController placeController) {
        super(placeController, view, CuentasProxy.class);
        this.requests = requests;
    }

    public Place getBackButtonPlace() {
        return ScaffoldMobileApp.ROOT_PLACE;
    }

    public String getBackButtonText() {
        return "Entities";
    }

    public Place getEditButtonPlace() {
        return null;
    }

    public String getTitleText() {
        return "Cuentases";
    }

    public boolean hasEditButton() {
        return false;
    }

    protected Request<java.util.List<com.aleprueba.ale.client.managed.request.CuentasProxy>> createRangeRequest(Range range) {
        return requests.cuentasRequest().findCuentasEntries(range.getStart(), range.getLength());
    }

    protected void fireCountRequest(Receiver<Long> callback) {
        requests.cuentasRequest().countCuentases().fire(callback);
    }
}
