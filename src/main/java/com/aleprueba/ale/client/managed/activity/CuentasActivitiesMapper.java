package com.aleprueba.ale.client.managed.activity;

import com.aleprueba.ale.client.managed.request.ApplicationRequestFactory;
import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.aleprueba.ale.client.managed.request.CuentasRequest;
import com.aleprueba.ale.client.managed.ui.CuentasDetailsView;
import com.aleprueba.ale.client.managed.ui.CuentasEditView;
import com.aleprueba.ale.client.managed.ui.CuentasListView;
import com.aleprueba.ale.client.managed.ui.CuentasMobileDetailsView;
import com.aleprueba.ale.client.managed.ui.CuentasMobileEditView;
import com.aleprueba.ale.client.scaffold.ScaffoldApp;
import com.aleprueba.ale.client.scaffold.place.CreateAndEditProxy;
import com.aleprueba.ale.client.scaffold.place.FindAndEditProxy;
import com.aleprueba.ale.client.scaffold.place.ProxyPlace;
import com.google.gwt.activity.shared.Activity;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.requestfactory.shared.EntityProxyId;
import com.google.gwt.requestfactory.shared.RequestContext;

public class CuentasActivitiesMapper {

    private final ApplicationRequestFactory requests;

    private final PlaceController placeController;

    public CuentasActivitiesMapper(ApplicationRequestFactory requests, PlaceController placeController) {
        this.requests = requests;
        this.placeController = placeController;
    }

    public Activity getActivity(ProxyPlace place) {
        switch(place.getOperation()) {
            case DETAILS:
                return new CuentasDetailsActivity((EntityProxyId<CuentasProxy>) place.getProxyId(), requests, placeController, ScaffoldApp.isMobile() ? CuentasMobileDetailsView.instance() : CuentasDetailsView.instance());
            case EDIT:
                return makeEditActivity(place);
            case CREATE:
                return makeCreateActivity();
        }
        throw new IllegalArgumentException("Unknown operation " + place.getOperation());
    }

    @SuppressWarnings("unchecked")
    private EntityProxyId<com.aleprueba.ale.client.managed.request.CuentasProxy> coerceId(ProxyPlace place) {
        return (EntityProxyId<CuentasProxy>) place.getProxyId();
    }

    private Activity makeCreateActivity() {
        CuentasEditView.instance().setCreating(true);
        final CuentasRequest request = requests.cuentasRequest();
        Activity activity = new CreateAndEditProxy<CuentasProxy>(CuentasProxy.class, request, ScaffoldApp.isMobile() ? CuentasMobileEditView.instance() : CuentasEditView.instance(), placeController) {

            @Override
            protected RequestContext createSaveRequest(CuentasProxy proxy) {
                request.persist().using(proxy);
                return request;
            }
        };
        return new CuentasEditActivityWrapper(requests, ScaffoldApp.isMobile() ? CuentasMobileEditView.instance() : CuentasEditView.instance(), activity, null);
    }

    private Activity makeEditActivity(ProxyPlace place) {
        CuentasEditView.instance().setCreating(false);
        EntityProxyId<CuentasProxy> proxyId = coerceId(place);
        Activity activity = new FindAndEditProxy<CuentasProxy>(proxyId, requests, ScaffoldApp.isMobile() ? CuentasMobileEditView.instance() : CuentasEditView.instance(), placeController) {

            @Override
            protected RequestContext createSaveRequest(CuentasProxy proxy) {
                CuentasRequest request = requests.cuentasRequest();
                request.persist().using(proxy);
                return request;
            }
        };
        return new CuentasEditActivityWrapper(requests, ScaffoldApp.isMobile() ? CuentasMobileEditView.instance() : CuentasEditView.instance(), activity, proxyId);
    }
}
