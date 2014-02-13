package com.aleprueba.ale.client.managed.activity;

import com.aleprueba.ale.client.managed.request.ApplicationRequestFactory;
import com.aleprueba.ale.client.managed.request.ModelProxy;
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

public class ModelListActivity extends AbstractProxyListActivity<ModelProxy> implements IsScaffoldMobileActivity {

    private final ApplicationRequestFactory requests;

    public ModelListActivity(ApplicationRequestFactory requests, ProxyListView<com.aleprueba.ale.client.managed.request.ModelProxy> view, PlaceController placeController) {
        super(placeController, view, ModelProxy.class);
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
        return "Models";
    }

    public boolean hasEditButton() {
        return false;
    }

    protected Request<java.util.List<com.aleprueba.ale.client.managed.request.ModelProxy>> createRangeRequest(Range range) {
        return requests.modelRequest().findModelEntries(range.getStart(), range.getLength());
    }

    protected void fireCountRequest(Receiver<Long> callback) {
        requests.modelRequest().countModels().fire(callback);
    }
}
